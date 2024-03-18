from django.conf import settings
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.db.models import Count, Avg, ExtractMonth
from django.db.models.functions import Coalesce
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView
from paypal.standard.forms import PayPalPaymentsForm
from requests import session
from taggit.models import Tag
from core.forms import ProductReviewForm
from core.models import Product, Category, Vendor, CartOrder, CartOrderProducts, ProductImages, ProductReview, wishlist_model, Address, ContactUs
from userauths.models import Profile
from django.template.loader import render_to_string
from django.utils.html import format_html
from django.utils.numberformat import format_number
from django.utils.functional import Q

class ProductListView(ListView):
    model = Product
    template_name = 'core/product-list.html'
    context_object_name = 'products'
    paginate_by = 12

    def get_queryset(self):
        query = self.request.GET.get("q")
        if query:
            return Product.objects.filter(title__icontains=query).order_by('-id')
        return Product.objects.filter(product_status='published').order_by('-id')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['tags'] = Tag.objects.all()[:6]
        return context

class CategoryListView(ListView):
    model = Category
    template_name = 'core/category-list.html'
    context_object_name = 'categories'

class CategoryProductListView(ListView):
    model = Product
    template_name = 'core/category-product-list.html'
    context_object_name = 'products'
    paginate_by = 12

    def get_queryset(self):
        category = get_object_or_404(Category, cid=self.kwargs['cid'])
        return Product.objects.filter(product_status='published', category=category).order_by('-id')

class VendorListView(ListView):
    model = Vendor
    template_name = 'core/vendor-list.html'
    context_object_name = 'vendors'

class VendorDetailView(View):
    def get(self, request, vid):
        vendor = get_object_or_404(Vendor, vid=vid)
        products = Product.objects.filter(vendor=vendor, product_status='published').order_by('-id')
        context = {
            'vendor': vendor,
            'products': products,
        }
        return render(request, 'core/vendor-detail.html', context)

class ProductDetailView(View):
    def get(self, request, pid):
        product = get_object_or_404(Product, pid=pid)
        products = Product.objects.filter(category=product.category).exclude(pid=pid)
        reviews = ProductReview.objects.filter(product=product).order_by('-date')
        average_rating = ProductReview.objects.filter(product=product).aggregate(rating=Avg('rating'))
        review_form = ProductReviewForm()
        make_review = True
        if request.user.is_authenticated:
            address = Address.objects.get(status=

[Unit]
Description=ecomprj Gunicorn Service
After=network.target

[Service]
User=<your_user>
Group=<your_group>
WorkingDirectory=/path/to/ecomprj
ExecStart=/path/to/venv/bin/gunicorn ecomprj.wsgi:application -b 0.0.0.0:8000 --log-file /path/to/ecomprj/logs/gunicorn.log
Restart=always

[Install]
WantedBy=multi-user.target


sudo systemctl daemon-reload


sudo systemctl enable ecomprj


sudo systemctl start ecomprj

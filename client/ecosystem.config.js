module.exports = {
  apps: [
    {
      name: 'fe1-client',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/fe1-backend/client',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    }
  ]
};

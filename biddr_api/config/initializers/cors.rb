Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
        origins 'http://127.0.0.1:5501', 'http://127.0.0.1:5500', 'localhost:5500', 'localhost:9999', 'http://127.0.0.1:9999', 'localhost:3434' 

        resource(
            '*', 
            headers: :any, 
            credentials: true, 
            methods: [:get, :post, :patch, :put, :delete, :options] 
        )
    end
end
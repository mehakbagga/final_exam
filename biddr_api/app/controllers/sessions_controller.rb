class SessionsController < ApplicationController

    def create
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: {user: user}
        else  
            render(
                json: {status: 404},
                status: 404
            )
        end
    end

    def destroy
        # session[:user_id] = nil
        reset_session
        render json: {logged_out: true, id: nil}
    end
end

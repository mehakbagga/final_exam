class UsersController < ApplicationController

    include CurrentUserConcern

    def current
        if @current_user
            render json: {
                user: @current_user
            }
        else  
            render json: {
                user: nil
            }
        end
    end

    def create
        user_params = params.require(:user).permit!
        user = User.new user_params
        if user.save
            session[:user_id] = user.id 
            render json: { user: user }
        else   
            render(
                json: { error: user.errors.messages },
                status: 422
            )
        end
    end
end

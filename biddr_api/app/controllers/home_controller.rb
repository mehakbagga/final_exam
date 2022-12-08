class HomeController < ApplicationController

    include CurrentUserConcern
    
    def welcome
        render(json:{user: @current_user})
    end
end

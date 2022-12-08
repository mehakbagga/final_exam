class BidsController < ApplicationController

    before_action :authenticate_user!

    include CurrentUserConcern

    def create
        bid = Bid.new(params.require(:bid).permit!)
        auction = Auction.find(params[:auction_id])
        bid.auction = auction
        bid.user = @current_user
        if bid.save
            #redirect_to auction_path(auction)
            render json: {bid: bid}
        else   
            render json: {stauts: 303}
        end
    end
end

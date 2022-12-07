class AuctionsController < ApplicationController

    before_action :authenticate_user!, except: [:index, :show]

    include CurrentUserConcern

    def create
        auction = Auction.new(params.require(:auction).permit!)
        auction.user = @current_user
        if auction.save
            render json: {id: auction.id}
        else  
            render(
                json: { errors: auction.errors.messages },
                status: 422
            )
        end
    end

    def show
        auction = Auction.find params[:id]
        render(json: auction)
    end

    def index
        auctions = Auction.order created_at: :desc
        render(json: auctions, each_serializer: AuctionCollectionSerializer)
    end

    def update
        auction = Auction.find params[:id]
        if auction.update(params.require(:auction).permit!)
            render(json: auction)
        else  
            render(json: {errors: auction.errors.messages})
        end
    end
end

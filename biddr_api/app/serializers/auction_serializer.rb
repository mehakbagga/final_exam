class AuctionSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :end_date, :bids, :reserve_price, :user, :draft, :published, :reserve_met

  has_many :bids
  belongs_to :user

  class BidSerializer < ActiveModel::Serializer
    attributes :id, :price, :bidder, :created_at

    def bidder
      object.user&.name
    end
  end

  class UserSerializer < ActiveModel::Serializer
    attributes :id, :name, :email
  end
end

class AuctionCollectionSerializer < ActiveModel::Serializer
  attributes :id, :title, :created_at, :user, :draft, :published, :reserve_met

  belongs_to :user

  class UserSerializer < ActiveModel::Serializer
    attributes :id, :name, :email
  end
end

class User < ApplicationRecord
    has_secure_password
    
    has_many :auctions, dependent: :destroy
    has_many :bids, dependent: :destroy
end

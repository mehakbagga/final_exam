# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
Bid.destroy_all
Auction.destroy_all
User.destroy_all

PASSWORD="123"

LOREM="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

i=1

test_user = User.create(
    name: 'Auction King',
    email: "king@gmail.com",
    password: PASSWORD,
    password_confirmation: PASSWORD
)

10.times do
  name = Faker::Name.first_name + i.to_s
  
  User.create(
    name: name,
    email: "#{name}@gmail.com",
    password: PASSWORD,
    password_confirmation: PASSWORD
  )

  i+=1
end

users = User.all

20.times do
    auction = Auction.create(
        title: Faker::Commerce.product_name,
        description: LOREM,
        end_date: Faker::Date.between(from: '2022-09-23', to: '2023-01-25'),
        reserve_price: rand(500..1000),
        user: users.sample
    )

    if auction.valid?
        rand(3..10).times do
            Bid.create(
                price: rand(300...500),
                auction: auction,
                user: users.sample
            )
        end
    end
end

5.times do
    auction = Auction.create(
        title: Faker::Commerce.product_name,
        description: LOREM,
        end_date: Faker::Date.between(from: '2022-09-23', to: '2023-01-25'),
        reserve_price: rand(500..1000),
        user: test_user
    )

    if auction.valid?
        rand(3..10).times do
            Bid.create(
                price: rand(300...500),
                auction: auction,
                user: users.sample
            )
        end
    end
end

auctions = Auction.all
bids = Bid.all

p "Generated #{users.count} users, #{auctions.count} auctions, #{bids.count} bids."
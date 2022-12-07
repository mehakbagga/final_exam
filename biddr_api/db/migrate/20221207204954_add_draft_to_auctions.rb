class AddDraftToAuctions < ActiveRecord::Migration[7.0]
  def change
    add_column :auctions, :draft, :boolean, default: true
  end
end

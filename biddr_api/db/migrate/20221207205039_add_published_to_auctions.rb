class AddPublishedToAuctions < ActiveRecord::Migration[7.0]
  def change
    add_column :auctions, :published, :boolean, default: false
  end
end

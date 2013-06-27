class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string  :email, null: false, unique: true
      t.string  :password_digest, null: false
      t.string  :access_token, null: false, unique: true
      t.string  :name

      t.timestamps
    end

    add_index :users, :access_token, unique: true
  end
end

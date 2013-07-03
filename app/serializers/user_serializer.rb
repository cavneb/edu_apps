class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name

  has_many :memberships, embed: :objects
end

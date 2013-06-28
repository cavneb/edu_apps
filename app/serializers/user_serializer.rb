class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :access_token

  has_many :memberships, embed: :ids, include: true
end

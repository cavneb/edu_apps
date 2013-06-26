class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :organization, :access_token
end

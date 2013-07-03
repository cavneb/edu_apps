class MembershipSerializer < ActiveModel::Serializer
  attributes :id, :is_admin

  has_one :organization, embed: :objects
  has_one :user, embed: :id
end

class MembershipSerializer < ActiveModel::Serializer
  attributes :id, :is_admin, :organization_id, :organization_name

  def organization_id
    object.organization.id
  end

  def organization_name
    object.organization.name
  end
end

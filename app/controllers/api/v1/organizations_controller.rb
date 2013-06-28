module Api
  module V1
    class OrganizationsController < Api::BaseController

      def index
        render json: organizations
      end

      def show
        render json: Organization.find(params[:id])
      end

      def add_member
        membership = current_user.memberships.where(organization_id: params[:id]).first
        if membership
          if membership.is_admin?
            organization = current_user.organizations.find(params[:id])
            # Check to see if member already exists
            user = User.where(email: params[:email]).first
            if user
              membership = organization.memberships.where(:user_id => user.id).first
              if !membership
                membership = Membership.create!(user_id: user.id, organization_id: organization.id, is_admin: params[:is_admin])
                render json: membership
              else
                render json: { message: 'User already belongs to this organization' }, status: :unprocessable_entity
              end
            else
              render json: { message: 'There are no users with that email address' }, status: :unprocessable_entity
            end
          else
            render json: { message: 'You do not have permissions to add members to this organization' }, status: :unprocessable_entity
          end
        else
          render json: { message: "Organization not found" }, status: :unprocessable_entity
        end 
      end

    end
  end
end

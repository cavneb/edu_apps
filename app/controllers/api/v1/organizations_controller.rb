module Api
  module V1
    class OrganizationsController < Api::BaseController

      def index
        render json: organizations
      end

    end
  end
end

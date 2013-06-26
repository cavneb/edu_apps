module Api
  module V1
    class LtiAppsController < Api::BaseController
      def index
        render json: LtiApp.all
      end

      def show
        app = LtiApp.where(short_name: params[:id]).first
        if app
          render json: app
        else
          render json: { message: "App not found" }, status: :unprocessable_entity
        end
      end
    end
  end
end
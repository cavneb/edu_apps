module Api
  module V1
    class EducationLevelsController < Api::BaseController
      def index
        render json: EducationLevel.all
      end

      def show
        render json: EducationLevel.find(params[:id])
      end
    end
  end
end
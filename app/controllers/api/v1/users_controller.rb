module Api
  module V1
    class UsersController < Api::BaseController
      before_filter :restrict_access, only: :index

      def index
        render json: User.all
      end

      def show
        user = User.where(access_token: params[:id]).first
        if user
          render json: user
        else
          render json: { message: "User not found" }, status: :unprocessable_entity
        end
      end

      def create
        @user = User.new(user_params)
        if @user.save
          render json: @user
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      def update
        @user = User.find(params[:id])
        if @user.update_attributes(user_params)
          render json: @user
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
      end
    end

  end
end
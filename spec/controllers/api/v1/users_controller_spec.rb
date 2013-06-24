require 'spec_helper'

describe Api::V1::UsersController do
  before(:each) do
    @user = User.create!(email: 'foo@example.com', password: 'secret', password_confirmation: 'secret')
  end

  describe "#index" do
    it "without access token" do
      get 'index'
      response.code.should == '401'
    end

    it "with invalid access token" do
      get 'index', { 'access_token' => '12345' }
      response.code.should == '401'
    end

    it "with valid access token" do
      get 'index', { 'access_token' => @user.access_token }
      json = JSON.parse(response.body)
      json['users'].size.should == 1
    end
  end

  it "#update" do
    post 'update', { id: @user.id, user: { email: 'foo3@example.com' }}
    json = JSON.parse(response.body)
    json['user']['email'].should == 'foo3@example.com'
    json['user']['access_token'].should == @user.access_token
    json['user']['id'].should == @user.id
  end
end

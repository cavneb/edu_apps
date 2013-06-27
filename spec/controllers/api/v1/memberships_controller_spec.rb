require 'spec_helper'

describe Api::V1::MembershipsController do
  before(:each) do
    session[:user_id] = nil
    @user = User.create!(name: 'Foo User', email: 'foo@example.com', password: 'secret', password_confirmation: 'secret')
    @org1 = Organization.create(name: 'Organization 1')
    @org2 = Organization.create(name: 'Organization 2')
    @org3 = Organization.create(name: 'Organization 3')
    Membership.create!(user_id: @user.id, organization_id: @org1.id, is_admin: true)
    Membership.create!(user_id: @user.id, organization_id: @org2.id, is_admin: false)
    Membership.create!(user_id: @user.id, organization_id: @org3.id, is_admin: false)
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
      session[:user_id] = @user.id
      get 'index', { 'access_token' => @user.access_token }
      json = JSON.parse(response.body)
      puts json.inspect
      json['memberships'].size.should == 3
    end
  end

  describe "#create_organization" do
    it "without access token" do
      post 'create_organization', {}
      response.code.should == '401'
    end

    it "with invalid access token" do
      post 'create_organization', { 'access_token' => '12345' }
      response.code.should == '401'
    end

    it "without an organization name" do
      session[:user_id] = @user.id
      post 'create_organization', { 'access_token' => @user.access_token }
      json = JSON.parse(response.body)
      puts json.inspect
      json['errors']['name'].should include "can't be blank"
    end

    it "with valid data" do
      session[:user_id] = @user.id
      post 'create_organization', { 'access_token' => @user.access_token, name: 'My Organization' }
      json = JSON.parse(response.body)
      puts json.inspect
      json['membership']['is_admin'].should be_true
      json['membership']['organization_id'].should > 0
      json['membership']['organization_name'].should == 'My Organization'
    end
  end
end

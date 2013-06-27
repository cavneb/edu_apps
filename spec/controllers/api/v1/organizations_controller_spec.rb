require 'spec_helper'

describe Api::V1::OrganizationsController do
  before(:each) do
    @org1 = Organization.create(name: 'Organization 1')
    @org2 = Organization.create(name: 'Organization 2')
    @org3 = Organization.create(name: 'Organization 3')
  end

  it "#index" do
    get 'index'
    json = JSON.parse(response.body)
    json['organizations'].size.should == 3
  end
end

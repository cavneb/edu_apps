require 'spec_helper'

describe User do
  it "should generate access_token on create" do
    user = User.create!(email: 'foo@example.com', password: 'secret', password_confirmation: 'secret')
    user.access_token.should be_present
  end
end

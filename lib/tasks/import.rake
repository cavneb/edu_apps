namespace :import do
  desc 'sync all missing screencasts from Railscasts.com'
  task :lti_examples => :environment do
    success = 0
    failure = 0
    data = JSON.parse(File.read("#{Rails.root}/public/data/lti_examples.json"))
    data.each do |node|
      app = LtiApp.new
      app.user_id              = 1 # hardcoded for now
      app.name                 = node['name']
      app.short_name           = node['id']
      app.description          = node['description']
      app.testing_instructions = node['test_instructions']
      app.author_name          = node['author_name']
      app.app_type             = node['app_type']
      app.ims_cert_url         = node['ims_link']
      app.cartridge            = node.to_json
      if app.save
        success += 1
      else
        failure += 1
      end
    end
    puts "#{success} added with #{failure} failures"
  end
end
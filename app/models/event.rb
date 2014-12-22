class Event < ActiveRecord::Base
	validates :start, presence: true
end

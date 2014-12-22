json.array!(@events) do |event|
	json.id event.id	
	json.name event.name
	json.start event.start.to_f
	json.duration event.duration.to_f
	json.eventype event.eventype
	json.day event.day.to_i
end
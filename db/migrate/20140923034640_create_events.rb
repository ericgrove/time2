class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name
      t.string :description
      t.decimal :start
      t.decimal :duration
      t.string :eventype
      t.string :repetition

      t.timestamps
    end
  end
end

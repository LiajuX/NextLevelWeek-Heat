# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :tags,
  ecto_repos: [Tags.Repo]

# Configures the endpoint
config :tags, TagsWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "PBLirZSmE8RLbJJndQDG6LJN3v7EwXdlnTfjzq9cUlUgFmY68W7xZq1p9j/jFxyo",
  render_errors: [view: TagsWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: Tags.PubSub,
  live_view: [signing_salt: "XY1geua7"]

config :tags, Tags.Scheduler, jobs: [
  {"* * * * *", {Tags.Tags.Count, :call, []}},
]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"

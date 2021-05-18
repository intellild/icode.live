# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

# Configures the endpoint
config :icode, IcodeWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "TZMyzzFb86pK62B99cI+O9Nfz3o9alzBcKHH3Kd62swbRzZ2NfNhrjB3airSasV4",
  render_errors: [view: IcodeWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Icode.PubSub,
  live_view: [signing_salt: "qtEqc0xJ"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"

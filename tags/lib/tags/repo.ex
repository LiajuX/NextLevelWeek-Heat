defmodule Tags.Repo do
  use Ecto.Repo,
    otp_app: :tags,
    adapter: Ecto.Adapters.Postgres
end

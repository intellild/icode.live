defmodule IcodeWeb.CodeChannel.Presence do
  @moduledoc false

  use Phoenix.Presence,
    otp_app: :icode,
    pubsub_server: Icode.PubSub
end

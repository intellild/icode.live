defmodule IcodeWeb.CodeChannel do
  use Phoenix.Channel
  alias IcodeWeb.CodeChannel.Presence
  alias IcodeWeb.User

  @impl true
  def join("code:" <> channel_id, _payload, socket) do
    if channel_id == User.get_socket(socket) do
      send(self(), :after_join)
      {:ok, socket}
    else
      {:error, "unauthorized"}
    end
  end
  
  @impl true
  def handle_info(:after_join, socket) do
    {:ok, _} = Presence.track(socket, User.get_socket(socket), %{})

    push(socket, "presence_state", Presence.list(socket))
    {:noreply, socket}
  end
end

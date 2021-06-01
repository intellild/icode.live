defmodule IcodeWeb.UserSocket do
  use Phoenix.Socket

  ## Channels
  channel "user:*", IcodeWeb.UserChannel
  channel "code:*", IcodeWeb.CodeChannel

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.
  @impl true
  def connect(%{"token" => token, "version" => version}, socket, _connect_info) do
    if version != "1" do
      {:error, "your page is outdated, please try cleaning browser cache and refresh"}
    else
      client = Tentacat.Client.new(%{access_token: token})
      case Tentacat.Users.me(client) do
        {200, %{"login" => user_login}, _} -> {:ok, assign(socket, :user_login, user_login)}
        {_, %{"message" => message}, _} -> {:error, message}
        _ -> {:error, "unknown"}
      end
    end

  end

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "user_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     IcodeWeb.Endpoint.broadcast("user_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  @impl true
  def id(socket), do: "user_socket:#{socket.assigns.user_login}"
end

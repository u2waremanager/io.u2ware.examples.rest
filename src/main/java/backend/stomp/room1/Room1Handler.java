package backend.stomp.room1;

import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;

import io.u2ware.common.stomp.client.WebsocketStompClientHandler;

@Component("/topic/room1")
public class Room1Handler implements WebsocketStompClientHandler{

    @Override
    public void handleFrame(StompHeaders headers, JsonNode payload) {

    }
}

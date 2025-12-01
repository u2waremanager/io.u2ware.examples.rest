package backend.api.items;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import io.u2ware.common.docs.MockMvcRestDocs;


@Component
public class ItemDocs extends MockMvcRestDocs {

    // public Map<String,Object> newEntity(Object fooLink, Object... barsLinks){
    //     Map<String,Object> r = new HashMap<>();
    //     r.put("title", randomText("item"));
    //     r.put("fooLink", fooLink);
    //     r.put("barsLinks", barsLinks);
    //     return r;
    // }
    
    // public Map<String,Object> updateEntity(Map<String,Object> r, Object fooLink, Object... barsLinks){
    //     r.put("title", randomText("itemUpdate1"));
    //     r.put("fooLink", fooLink);
    //     r.put("barsLinks", barsLinks);
    //     return r;
    // }
}

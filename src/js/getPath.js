
export function getPath(el){
    
    if (!(el instanceof Element))
            return "";

    const path = [];

    while (el.localName != "html") {

        const selector = el.localName;
        
        if (el.id) {
            
            selector += '#' + el.id;
            path.unshift(selector);
            
            break;

        } else {

            let sib = el;
            let nth = 1;

            while (sib = sib.previousElementSibling) {
                if (sib.localName == selector){
                    nth++;
                }
            }

            if (nth > 1){
                selector += `:nth-of-type(${nth})`;
            }
                
        }

        path.unshift(selector);

        el = el.parentNode;
    }

    return path.join(" > ");
}
import { useNavigate } from "react-router-dom";
import { useEffect, useState, ChangeEvent, Key, useRef } from "react";
import "./faq_item.css";
import { animate, motion, useInView } from "motion/react";
import { inView, stagger } from "motion";
import { SlArrowDown } from "react-icons/sl";


function FaqItem(props: any)
{
    const [toggleFaq, setFaq] = useState(true);
    const [addClass, setClass] = useState('');
    const ElementRef = useRef<HTMLDivElement>(null);
    let dateTime = new Date()
    let pos_id:any = dateTime.getTime();
    let delay:number = 0;
    if('delay' in props)
    {
        delay += props.delay;
    }

    function showFaqcontent()
    {
        if(ElementRef.current)
        {
            if(toggleFaq)
            {
                let height:any = document.getElementById("faq_positioner"+pos_id)?.offsetHeight
                ElementRef.current.style.height = height+"px";
                setClass('faq_open');
            }
            else
            {
                ElementRef.current.style.height = "0px";
                setClass('');
            }
 
        }
        
        setFaq(!toggleFaq)
    }

    return(
    <motion.div className="faq_item_outer"
        initial={{opacity: 0, x: -20}}
        animate={{opacity: 1, x: 0}}
        transition={{duration: 0.08, delay: delay*0.08}}>
        
        <div className="faq_item_header">
            <div className="faq_item_click_area" onClick={showFaqcontent}></div>
            <div className="faq_item_title">{props.title}</div>
            <div className={"faq_item_opener "+addClass}><SlArrowDown/></div>
        </div>
        
        <div className="faq_item_content" id='faq_target' ref={ElementRef} style={{height: 0}}>
            {props.content}
        </div>

        <div className="faq_item_content faq_posiotioner" id={'faq_positioner'+pos_id}>
            {props.content}
        </div>
        
    </motion.div>);
}

export default FaqItem;
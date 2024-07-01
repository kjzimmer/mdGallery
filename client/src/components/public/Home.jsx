import Col from "react-bootstrap/esm/Col"
import Image from "react-bootstrap/esm/Image"
import Row from "react-bootstrap/esm/Row"



export const Home = () => {
    return (<>
        <Row>
            <Col>
                <h2>PAINTER OF THE WEST AND IT'S WILD</h2>
                <Image src="wide-open-wild.jpg" fluid />
                <h3>Melody DeBenedictis</h3>
                <h3>Fine Oil Paintings</h3>
                <p>‘Painter of the West and Its Wild’ would be the best description of Melody DeBenedictis’ work. Melody has been a full-time professional artist since 2014. Her fine art is focused on the land, the wild, and the wild mustang that call these lands home. Over the last 14 years Melody has traveled the western open lands extensively photographing and experiencing the wild that she incorporates in her paintings. A strong focus on the wild mustang and equine resonates with having her own wild and domestic horses and is easily seen in her work.
                    She has spent these years showcasing her work in galleries across the west from Jackson Hole to Taos, attending art shows and festivals across the west, her fine art telling the stories of the wild and the wild mustang. She has won numerous awards over the years. Throughout her travels she has been in magazines, newspaper articles and radio. Melody has been called prolific in her career as an artist. Her work is a mix of realism and surrealism with a vivid color palette.
                </p>
            </Col>
            <Col>
                <h2>THE STUDIO IS OPEN BY APPOINTMENT  LOCATED IN WESTCLIFFE CO</h2>
                <Image src="20240425-093530_orig.jpg" fluid />
                <Image src="20240425-093550_orig.jpg" fluid />
                <Image src="318340062-10158570301305683-7220463796230662152-n.jpg" fluid />
                <Image src="108986229-10156965277955683-4494193059382261431-n.jpg" fluid />
            </Col>
        </Row>
        <Row>
            <Col>
                <Image src="unnamed-1_orig.jpg" fluid />
            </Col>
            <Col>
                <Image src="cga-pro-member-logo_orig.png" fluid />
            </Col>
        </Row>
    </>)
}
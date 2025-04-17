import { Text,  View} from "react-native";
import { IconProps } from "@tabler/icons-react-native";

import { s } from "./styles";
import { colors } from "@/styles/theme";

type Props = {
    title: string,
    description: string,
    icon: React.ComponentType<IconProps>
};

export function Step({title, description, icon: Icon}: Props) {
    {/* 
        se o parametro for props, devemos referenciar os atributos usando as chaves
        se o paremetro for {title, description}, podemos referenciar os atributos diretamente    
    */}

    return (
        <View style={s.container}>
            {/* se tirar esta view, o titulo e descrição ficam um do lado do outro */}

            {/* se tem icon então renderiza ele */}
            {Icon && <Icon size={32} color={colors.red.base} />}

            <View> 
                <Text style={s.title}>{title}</Text>
                <Text style={s.description}>{description}</Text>
            </View>
        </View>
    )
};
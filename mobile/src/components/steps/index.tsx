import { Text,  View} from "react-native";
import { IconMapPin, IconQrcode, IconTicket } from "@tabler/icons-react-native";

import { s } from "./styles";
import { Step } from "@/components/step";

export function Steps() {
    return (
        <View style={s.container}>
            <Text style={s.title}>Veja como funciona:</Text>

            <Step 
                title="Encontre estabelecimentos"
                description="Veja locais perto de você que são parceiros Nearby"
                icon={IconMapPin}
            />

            <Step 
                title="Ative seu cupom com QR Code"
                description="Escaneie o código no estabelecimento para usar o benefício"
                icon={IconQrcode}
            />

            <Step 
                title="Garanta vantagens perto de você"
                description="Ative cupons onde estiver, em diferentes tipos de estabelencimentos"
                icon={IconTicket}
            />
        </View>
    )
};
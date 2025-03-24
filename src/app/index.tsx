import { Image, Text, View } from "react-native";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  MapPin,
  Calendar as CalendarIcon,
  Settings2,
  UserRoundPlus,
  ArrowRight,
} from "lucide-react-native";
import { colors } from "@/styles/colors";
import { useState } from "react";

enum StepForm {
  TRIP_DETAILS = 1,
  ADD_FRIENDS = 2,
}

export default function App() {
  const [stepForm, setStepForm] = useState(StepForm.TRIP_DETAILS);

  function handleNextStepForm() {
    if (stepForm === StepForm.TRIP_DETAILS) {
      setStepForm(StepForm.ADD_FRIENDS);
    }
  }

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Image
        source={require("@/assets/logo.png")}
        className="h-8"
        resizeMode="contain"
      />

      <Image
        source={require("@/assets/bg.png")}
        className="absolute"
        resizeMode="contain"
      />

      <Text className="text-lg text-zinc-400 font-regular text-center mt-3">
        Convide seus amigos e planeje sua {"\n"} próxima viagem
      </Text>

      <View className="w-full bg-zinc-900 rounded-xl p-4 my-8 border border-zinc-800">
        <Input>
          <MapPin color={colors.zinc[400]} size={20} />
          <Input.Field
            placeholder="Para onde?"
            editable={stepForm === StepForm.TRIP_DETAILS}
          />
        </Input>
        <Input>
          <CalendarIcon color={colors.zinc[400]} size={20} />
          <Input.Field
            placeholder="Quando?"
            editable={stepForm === StepForm.TRIP_DETAILS}
          />
        </Input>

        {stepForm === StepForm.ADD_FRIENDS && (
          <>
            <View className="py-3 border-b border-zinc-800">
              <Button
                variant="secondary"
                onPress={() => setStepForm(StepForm.TRIP_DETAILS)}
              >
                <Button.Title>Alterar local/data</Button.Title>
                <Settings2 color={colors.zinc[200]} size={20} />
              </Button>
            </View>

            <Input>
              <UserRoundPlus color={colors.zinc[400]} size={20} />
              <Input.Field placeholder="Quem estará na viagem?" />
            </Input>
          </>
        )}

        <Button onPress={handleNextStepForm}>
          <Button.Title>
            {stepForm === StepForm.TRIP_DETAILS
              ? "Continuar"
              : "Confirmar viagem"}
          </Button.Title>
          <ArrowRight color={colors.lime[950]} size={20} />
        </Button>
      </View>

      <Text className="text-zinc-500 font-regular text-center text-base">
        Ao planejar sua viagem pela plann.er você automaticamente concorda com
        nossos{" "}
        <Text className="text-zinc-300 underline">
          termos de uso e políticas de privacidade
        </Text>
        .
      </Text>
    </View>
  );
}

import { useState } from "react";
import { Image, Keyboard, Text, View } from "react-native";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal";

import {
  MapPin,
  Calendar as CalendarIcon,
  Settings2,
  UserRoundPlus,
  ArrowRight,
} from "lucide-react-native";
import { colors } from "@/styles/colors";
import { Calendar } from "@/components/calendar";

enum StepForm {
  TRIP_DETAILS = 1,
  ADD_FRIENDS = 2,
}

enum ModalType {
  NONE = 0,
  CALENDAR = 1,
  GUESTS = 2,
}

export function Home() {
  const [stepForm, setStepForm] = useState(StepForm.TRIP_DETAILS);
  const [showModal, setShowModal] = useState(ModalType.NONE);

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
            onFocus={() => Keyboard.dismiss()}
            showSoftInputOnFocus={false}
            onPressIn={() => {
              stepForm === StepForm.TRIP_DETAILS &&
                setShowModal(ModalType.CALENDAR);
            }}
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

      <Modal
        title="Selecionar datas"
        subtitle="Selecione a data de ida e volta da viagem"
        visible={showModal === ModalType.CALENDAR}
        onClose={() => setShowModal(ModalType.NONE)}
      >
        <View className="gap-4 mt-4">
          <Calendar />
          <Button onPress={() => setShowModal(ModalType.NONE)}>
            <Button.Title>Confirmar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}

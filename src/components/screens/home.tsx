import { useState } from "react";
import { Alert, Image, Keyboard, Text, View } from "react-native";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/modal";

import {
  MapPin,
  Calendar as CalendarIcon,
  Settings2,
  UserRoundPlus,
  ArrowRight,
  AtSign,
} from "lucide-react-native";
import { colors } from "@/styles/colors";
import { Calendar } from "@/components/calendar";
import { GuestEmail } from "@/components/email";
import { calendarUtils, DatesSelected } from "@/utils/calendar-utils";
import { validateInput } from "@/utils/validate-input";

import { DateData } from "react-native-calendars";

import dayjs from "dayjs";

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
  const [selectedDates, setSelectedDates] = useState<DatesSelected>(
    {} as DatesSelected
  );

  const [destination, setDestination] = useState("");
  const [emailToInvite, setEmailToInvite] = useState("");
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);

  function handleNextStepForm() {
    if (
      destination.trim() === "" ||
      !selectedDates.startsAt ||
      !selectedDates.endsAt
    ) {
      return Alert.alert(
        "Detalhes da viagem",
        "Preencha todas as informações da viagem para seguir."
      );
    }

    if (destination.length < 4) {
      return Alert.alert(
        "Detalhes da viagem",
        "Destino não pode conter menos de 4 caracteres."
      );
    }

    if (stepForm === StepForm.TRIP_DETAILS) {
      setStepForm(StepForm.ADD_FRIENDS);
    }
  }

  function handleSelectDate(selectedDay: DateData) {
    const dates = calendarUtils.orderStartsAtAndEndsAt({
      startsAt: selectedDates.startsAt,
      endsAt: selectedDates.endsAt,
      selectedDay,
    });
    setSelectedDates(dates);
  }

  function handleRemoveEmail(emailToRemove: string) {
    setEmailsToInvite((emails) => emails.filter((e) => e !== emailToRemove));
  }

  function handleAddEmail() {
    if (emailToInvite.trim() === "") {
      return Alert.alert("Convidar amigos", "Insira um e-mail para convidar.");
    }

    if (emailsToInvite.includes(emailToInvite)) {
      return Alert.alert(
        "Convidar amigos",
        "Esse e-mail já foi adicionado a sua lista de convites."
      );
    }

    if (!validateInput.email(emailToInvite)) {
      return Alert.alert("Convidar amigos", "Insira um e-mail válido.");
    }

    setEmailsToInvite((emails) => [...emails, emailToInvite]);
    setEmailToInvite("");
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
            value={destination}
            onChangeText={setDestination}
            editable={stepForm === StepForm.TRIP_DETAILS}
          />
        </Input>
        <Input>
          <CalendarIcon color={colors.zinc[400]} size={20} />
          <Input.Field
            placeholder="Quando?"
            value={selectedDates.formatDatesInText}
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
              <Input.Field
                autoCorrect={false}
                value={
                  emailsToInvite.length > 0
                    ? `${emailsToInvite.length} convidado(s)`
                    : ""
                }
                editable={stepForm === StepForm.ADD_FRIENDS}
                onFocus={() => Keyboard.dismiss()}
                showSoftInputOnFocus={false}
                onPressIn={() => {
                  stepForm === StepForm.ADD_FRIENDS &&
                    setShowModal(ModalType.GUESTS);
                }}
                placeholder="Quem estará na viagem?"
              />
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
          <Calendar
            onDayPress={handleSelectDate}
            markedDates={selectedDates.dates}
            minDate={dayjs().toISOString()}
          />
          <Button onPress={() => setShowModal(ModalType.NONE)}>
            <Button.Title>Confirmar</Button.Title>
          </Button>
        </View>
      </Modal>

      <Modal
        title="Selecionar convidados"
        subtitle="Os convidados irão receber um e-mail para confirmar a sua participação na viagem."
        visible={showModal === ModalType.GUESTS}
        onClose={() => setShowModal(ModalType.NONE)}
      >
        <View className="my-2 flex-wrap gap-2 border-b border-zinc-800 py-5 items-start">
          {emailsToInvite.length > 0 ? (
            emailsToInvite.map((email) => (
              <GuestEmail
                key={email}
                email={email}
                onRemove={() => handleRemoveEmail(email)}
              />
            ))
          ) : (
            <Text className="text-zinc-600 font-regular text-base">
              Nenhum convidado adicionado
            </Text>
          )}
        </View>

        <View className="gap-4 mt-4">
          <Input variant="secondary">
            <AtSign color={colors.zinc[400]} size={20} />
            <Input.Field
              placeholder="Digite o email do convidado"
              keyboardType="email-address"
              value={emailToInvite}
              autoCapitalize="none"
              secureTextEntry
              onChangeText={(text) => setEmailToInvite(text.toLowerCase())}
              returnKeyType="send"
              onSubmitEditing={handleAddEmail}
            />
          </Input>

          <Button onPress={handleAddEmail}>
            <Button.Title>Convidar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}

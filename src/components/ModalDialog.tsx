import React, { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import { ModalDialogProps } from "../constants/types";

// reusable component to display a dialog with custom content
// children can be a React Native component or a simple <Text/>
const ModalDialog: React.FC<ModalDialogProps> = ({
  modalVisible,
  animationType,
  children,
  footerBtns,
}) => {
  // Modal dialog footer buttons and their respective handlers can be customized
  // negative button is optional
  const { positiveBtn, negativeBtn } = footerBtns;
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    setShowModal(modalVisible);
  }, [modalVisible]);
  return (
    <View style={styles.centeredView}>
      <Modal
        visible={showModal}
        transparent={true}
        animationType={animationType ? animationType : "slide"}
        onRequestClose={() => setShowModal(false)}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <View style={styles.modalView}>
            {children}
            <View style={styles.footerBtnsContainer}>
              <Pressable onPress={positiveBtn.handler}>
                <Text style={[styles.footerBtns, styles.positiveBtn]}>
                  {positiveBtn?.text}
                </Text>
              </Pressable>
              {negativeBtn && (
                <Pressable onPress={negativeBtn.handler}>
                  <Text style={[styles.footerBtns, styles.negativeBtn]}>
                    {negativeBtn.text}
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default React.memo(ModalDialog);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    flexDirection: "column",
    margin: 8,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 5,
  },
  footerBtnsContainer: {
    marginTop: 24,
    marginRight: 16,
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  footerBtns: {
    marginLeft: 12,
    fontSize: 16,
  },
  positiveBtn: {
    color: "#1e90ff",
  },
  negativeBtn: {
    color: "#CCC",
  },
});

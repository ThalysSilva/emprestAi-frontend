import { Pressable, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const CustomButton = styled(Pressable)<{ backgroundColor?: string }>`
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor ?? theme.COLORS.HEADER_BG};
  border: 1px solid ${({ theme }) => theme.COLORS.HEADER_BG};
  padding: 12px;
  border-radius: 99px;
  flex: 1;
  flex-direction: row;
  gap: 8px;
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const CustomButtonText = styled(Text)<{ color?: string }>`
  font-size: ${RFValue(12)}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.ROBOTO_SEMIBOLD};
  color: ${({ theme, color }) => color ?? theme.COLORS.WHITE};
`;

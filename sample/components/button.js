import React from 'react';
import { Button, Spacing, Text, colors } from 'react-elemental';

const SampleButton = () => {
  return (
    <div>
      <Spacing size="huge" bottom>
        <Text size="gamma" color="primary" uppercase>
          Buttons
        </Text>
        <Text>
          Buttons convey user actionability.
        </Text>
      </Spacing>

      <Spacing size="huge" bottom>
        <Spacing bottom>
          <Text size="iota" color="gray70" uppercase bold>
            Sizes
          </Text>
        </Spacing>

        <Spacing bottom>
          <Spacing size="tiny" bottom>
            <Text size="kilo" color="gray30" uppercase bold>
              Gamma
            </Text>
          </Spacing>

          <Button
            size="gamma"
            text="Click me"
          />
        </Spacing>

        <Spacing bottom>
          <Spacing size="tiny" bottom>
            <Text size="kilo" color="gray30" uppercase bold>
              Beta
            </Text>
          </Spacing>

          <Button
            size="beta"
            text="Click me"
          />
        </Spacing>

        <Spacing bottom>
          <Spacing size="tiny" bottom>
            <Text size="kilo" color="gray30" uppercase bold>
              Alpha
            </Text>
          </Spacing>

          <Button
            size="alpha"
            text="Click me"
          />
        </Spacing>
      </Spacing>

      <Spacing size="huge" bottom>
        <Spacing bottom>
          <Text size="iota" color="gray70" uppercase bold>
            Customizability
          </Text>
        </Spacing>

        <Spacing size="small" bottom>
          <Text>
            You can pass a custom color and arbitrary children.
          </Text>
        </Spacing>

        <Spacing size="small" bottom>
          <Button
            color={colors.purple}
            text="Purple button!"
          />
        </Spacing>

        <Button colors={colors.green}>
          <Text bold inline>
            hello
          </Text>
          <Text inline>
            world
          </Text>
        </Button>
      </Spacing>
    </div>
  );
};

export default SampleButton;

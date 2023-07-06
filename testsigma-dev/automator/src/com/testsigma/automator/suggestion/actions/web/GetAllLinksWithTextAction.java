package com.testsigma.automator.suggestion.actions.web;

import com.testsigma.automator.suggestion.actions.SuggestionAction;
import com.testsigma.automator.suggestion.actions.SuggestionActionResult;
import org.json.JSONObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GetAllLinksWithTextAction extends SuggestionAction {
  @Override
  protected void execute() throws Exception {
    List<WebElement> links = getDriver().findElements(By.xpath("//a"));
    Assert.isTrue(links.size() != 0, String.valueOf(SuggestionActionResult.Failure));
    List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    for (WebElement element : links) {
      Map<String, String> suggestions = new HashMap<String, String>();
      suggestions.put("Link Text", element.getText());
      suggestions.put("Inner HTML", element.getAttribute("innerHTML"));
      list.add(suggestions);
    }

    engineResult.getMetaData().setSuggestions(new JSONObject().put("list", list));
  }
}
